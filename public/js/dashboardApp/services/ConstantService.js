angular.module('DashboardApp').constant('ConstantService', {
    defaultFilterCategories: [
        { prop: 'Loc1Name', name: 'Site' },
        { prop: 'Loc2Name', name: 'Area' },
        { prop: 'Loc3Name', name: 'Sub Area' },
        { prop: 'IssueSubTypeName', name: 'Issue' },
        { prop: 'SharedTo', name: 'Engineer' },
        { prop: 'FormUsed', name: 'Status' }
    ]
});
