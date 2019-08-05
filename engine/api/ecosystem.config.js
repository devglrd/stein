module.exports = {
    apps: [{
        name: 'stein-api',
        script: './dist/main.js',
        instances: 1,
        ignore_watch: ['node_modules'],
        exec_mode: 'cluster',
        env: {
            "KUE_START_PROCESSING": false
        },
        node_args: '--max_old_space_size=8192',
    }, {
        name: "stein-worker",
        ignore_watch: ['node_modules'],
        env: {
            "KUE_START_PROCESSING": true
        },
        script: './dist/main.js',
        instances: 1,
        merge_logs: true
    }],
};
