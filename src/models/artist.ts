import ItemType from "./item-type";

interface Artist {
  id: number;
  name: string;
  birthday?: string;
  biography: string;
  homepage?: string;
  type?: ItemType;
  profile_path: string;
}

export default Artist;
