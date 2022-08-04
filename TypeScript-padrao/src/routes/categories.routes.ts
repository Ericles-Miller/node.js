import { response, Router } from 'express'; //importo da biblioteca express;
import { createCategorycontroller } from '../modules/car/UseCases/createCategory';
import { listCategoriesController } from '../modules/car/UseCases/listCategories';

import multer from 'multer';
// importando car de rotas;
const categoriesRoutes = Router();

// declaracao multer 
const upload = multer({
    dest:"./tmp", // dir do arquivo 
})

categoriesRoutes.post("/", (request, response) => {
    return createCategorycontroller.handle(request,response);
});

categoriesRoutes.get('/', (request,response) =>{
    return listCategoriesController.handle(request,response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) =>{
    const {file} = request;
    console.log(file);
    return response.send();
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
