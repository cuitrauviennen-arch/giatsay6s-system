import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const permissions = [
          'api::hero.hero.find',
          'api::contact.contact.find',
          'api::service.service.find',
          'api::service.service.findOne',
          'api::process-step.process-step.find',
          'api::process-step.process-step.findOne',
        ];

        for (const action of permissions) {
          const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action },
          });

          if (!existingPermission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                role: publicRole.id,
                action,
              },
            });
          }
        }
        console.log('Public permissions bootstrapped successfully.');
      }
    } catch (error) {
      console.error('Error bootstrapping permissions:', error);
    }
  },
};
