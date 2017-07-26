import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { GroupFiltersService } from './../../telemetry-services/filtering/group-filters.service';
import { DeviceModel } from './../../telemetry-services/models/device.model';

import { FilterTree, TreeBranch, TreeOption } from './filter-tree';

@Component({
  selector: 'filter-tree',
  templateUrl: './filter-tree.component.html',
  styleUrls: ['./filter-tree.component.scss']
})
export class FilterTreeComponent implements OnInit {

  public static tree: FilterTree = null;

  public static organization: TreeBranch;
  public static type: TreeBranch;
  public static condition: TreeBranch;

  public activePanel = 0;
  public panelChange(id) {
    this.activePanel = id;
  }

  public toggleCheck(treeOption: TreeOption) {
    treeOption.selected = !treeOption.selected;
    this._groupFiltersService.filterChanged((dm: DeviceModel): boolean => {
      let pass1: boolean = false;
      let pass2: boolean = false;
      let pass3: boolean = false;

      if(FilterTreeComponent.organization.numberElements == 0 || (FilterTreeComponent.organization.numberElements > 0 && FilterTreeComponent.organization.treeOptions.find(o =>  o.selected && o.label == dm.organization))) {
        pass1 = true;
      }

      if(FilterTreeComponent.type.numberElements == 0 || (FilterTreeComponent.type.numberElements > 0 && FilterTreeComponent.type.treeOptions.find(o =>  o.selected && o.label == dm.systemType.toString()))) {
        pass2 = true;
      }

      if(FilterTreeComponent.condition.numberElements == 0 || (FilterTreeComponent.condition.numberElements > 0 && FilterTreeComponent.condition.treeOptions.find(o =>  o.selected && o.label == dm.deviceStatus))) {
        pass3 = true;
      }

      return pass1 && pass2 && pass3;
    });
  }

  public get tree() {
    return FilterTreeComponent.tree;
  }

  constructor(private _groupFiltersService: GroupFiltersService) { }

  ngOnInit() {
    if(FilterTreeComponent.tree != null)
      return;

    FilterTreeComponent.tree = new FilterTree();

    FilterTreeComponent.organization = new TreeBranch();
    FilterTreeComponent.organization.title = 'Organization';
    FilterTreeComponent.tree.branches.push(FilterTreeComponent.organization);

    FilterTreeComponent.type = new TreeBranch();
    FilterTreeComponent.type.title = 'Type';
    FilterTreeComponent.tree.branches.push(FilterTreeComponent.type);

    FilterTreeComponent.condition = new TreeBranch();
    FilterTreeComponent.condition.title = 'Condition';
    FilterTreeComponent.tree.branches.push(FilterTreeComponent.condition);

    this._groupFiltersService.getGroups().take(2).subscribe(groups => {
      if(FilterTreeComponent.organization.treeOptions.length > 0 || FilterTreeComponent.type.treeOptions.length || FilterTreeComponent.condition.treeOptions.length) {
        return;
      }

      for(let element in groups.organizations) {
        FilterTreeComponent.organization.treeOptions.push(new TreeOption(element, groups.organizations [element], false));
      }

      for(let element in groups.types) {
        FilterTreeComponent.type.treeOptions.push(new TreeOption(element, groups.types [element], false));
      }

      for(let element in groups.conditions) {
        FilterTreeComponent.condition.treeOptions.push(new TreeOption(element, groups.conditions [element], element != 'INACTIVE'));
      }
    });
  }

}
