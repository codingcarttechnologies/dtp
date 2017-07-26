export class TreeOption {
  constructor(label, num, selected) {
    this.label = label;
    this.numberElements = num;
    this.selected = selected;
  }

  public label: string;
  public numberElements: number;
  public selected: boolean;
}

export class TreeBranch {
  public title: string;

  public get numberElements(): number {
    return this.treeOptions
    .reduce((acc, curr) => { return acc + (curr.selected ? curr.numberElements : 0); }, 0);
  }

  public treeOptions: TreeOption [] = [];
}

export class FilterTree {
  public branches: TreeBranch [] = [];
}
