import { CategoryRepository } from "../repository/category.repository";
import { CreatedCategoryDto } from "../validators/category.validators";

const repository = new CategoryRepository();

export class CategoryService{
    // Logika Get All Data
    async getCategorys() {
        return repository.findAll();
    }

    async createdCategory(data: CreatedCategoryDto) {
        return repository.created(data);
    }
}