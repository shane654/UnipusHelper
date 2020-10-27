// {
//     //离线模式应该不是让用户手动选择的，而是连接服务器失败之后自动操作的，作为备用方案
//     id: "offlineMode",
//     name: "离线模式",
//     type: "switch",
//     default: false,
//     description: "服务器连接不上时，使用官方接口",
// },

export default [
    {
        title: "普通练习",
        display: true,
        settings: [
            {
                id: "autoSolveNormal",
                name: "自动答题",
                type: "switch",
                default: false,
                description: "是否自动解答普通练习",
            },
            {
                id: "solveIntervalMin",
                name: "间隔下限",
                default: 3000,
                description: "单位毫秒，普通练习题的答题间隔下限",
            },
            {
                id: "solveIntervalMax",
                name: "间隔上限",
                default: 8000,
                description: "单位毫秒，普通练习题的答题间隔上限",
            },
        ],
    },
];
