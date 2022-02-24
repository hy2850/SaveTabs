// Custom types
// export interface Category {
//   id: string;
//   name: string;
//   tabs: chrome.tabs.Tab[];
// }

export interface Category {
  _id: string;
  name: string;
  tags: string[];
}

export interface Tab {
  _id: string;
  categoryId?: string;
  title?: string;
  url: string;
  favIconUrl?: string;
  createdAt: Date;
}

export interface CategoryOrder {
  _id: string;
  order?: string[];
}

export interface TabOrder {
  _id: string;
  categoryId: string;
  order?: string[];
}

export interface CategoryWithTabs extends Category {
  tabs: Tab[];
}
