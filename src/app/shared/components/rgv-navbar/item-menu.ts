export interface ItemMenu {

  id: number;
  name: string;
  active: boolean;
  url: string;
  itemMenus: ItemMenu[];
  parentId: number;

}
