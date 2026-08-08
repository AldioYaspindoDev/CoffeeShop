import { MenuRepository } from "../repository/menu.repository";
import { CreatedMenuDto, UpdatedMenuDto } from "../validators/menu.validator";

const repository = new MenuRepository();

export class MenuService {
    // Logik Get All menu
    async getMenus() {
        return repository.findAll();
    }

    async createdMenu(data: CreatedMenuDto) {
        return repository.created(data)
    }

    async updatedMenu(data: UpdatedMenuDto, id: string){
        return repository.updated(data, id)
    }

    async deletedMenu(id: string){
        return repository.deleted(id);
    }
}

