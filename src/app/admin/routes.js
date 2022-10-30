import controller from './controller';

export function setup(router) {
    router.post('/add', controller.addAdmin);
    router.post('/select', controller.selectAdmin);
    router.post('/addAdminCompany', controller.addAdminCompany);
}