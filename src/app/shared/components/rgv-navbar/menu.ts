export interface Menu {

  id: number;
  name: string;
  active: boolean;
  url?: string;
  subMenus?: Menu[];
  menuParent?: Menu;

}
