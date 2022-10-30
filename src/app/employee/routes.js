import controller from './controller';

export function setup(router) {
    router.post('/create', controller.createEmployee);
    router.post('/update', controller.updateEmployee);
    router.post('/read', controller.readEmployee);
    router.post('/import', controller.importEmployee);
    
}