export interface ChildCategoryObj {
    childCategoryId: number;
    categoryName: string;
    parentCategoryId: number;
}
export interface getChildCategoryObj {
    categoryName: string;
    parentCategoryName: string;
    childCategoryId: number;
}