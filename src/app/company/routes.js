import controller from './controller';

export function setup(router) {
    router.post('/create', controller.createCompany);
    router.post('/read', controller.readCompany);
    router.put('/update', controller.updateCompany);
    router.delete('/delete', controller.deleteCompany);
}