module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能
                'modify', // 修改
                'fix', // 修复bug
                'docs', // 文档
                'style', // 格式
                'refactor', // 重构
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', //回滚
                'upgrade' // 第三方库升级
            ],
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
    },
};
