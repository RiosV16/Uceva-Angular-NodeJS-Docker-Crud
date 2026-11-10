export interface TableCoursesEvents {
    id: number;
    action: TableCoursesActions;
}

export type TableCoursesActions = 'detail' | 'edit' | 'delete';