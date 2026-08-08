import { CategoryRepository } from "../repository/category.repository";
import { CreatedCategoryDto, UpdatedCategoryDto } from "../validators/category.validators";

const repository = new CategoryRepository();

export class CategoryService{
    // Logika Get All Data
    async getCategorys() {
        return repository.findAll();
    }

    async createdCategory(data: CreatedCategoryDto) {
        return repository.created(data);
    }

    async updatedCategory(data: UpdatedCategoryDto, id: string){
        return repository.updated(data, id);
    }

    async deletedCategory(id: string){
        return repository.deleted(id);
    }
}