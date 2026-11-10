import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../interfaces/course';
import { TableCoursesActions, TableCoursesEvents } from '../../interfaces/table-courses';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-table-courses',
  imports: [Button],
  templateUrl: './table-courses.html',
})
export class TableCourses {
  @Input() courses: Course[] = [];
  @Output() onClickActions = new EventEmitter<TableCoursesEvents>();

  configDetailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm'
  }

  configEditButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm'
  }

  configDeleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm'
  }

  click(id: number, action: TableCoursesActions){
    this.onClickActions.emit({id, action});
  }

}
