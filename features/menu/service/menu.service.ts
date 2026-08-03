import { MenuRepository } from "../repository/menu.repository";
import { CreatedMenuDto } from "../validators/menu.validator";

const repository = new MenuRepository();

export class MenuService {
    // Logik Get All menu
    async getMenus() {
        return repository.findAll();
    }

    async createdMenu(data: CreatedMenuDto) {
        return repository.created(data)
    }
}

