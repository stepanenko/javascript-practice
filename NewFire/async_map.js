
// enum enum JobType {
//     Preprocess = "preprocess",
//     Analyze = "analyze",
//     SHAPSummary = "shap-summary",
//     Predict = "predict"
// }

// Compiles into:
let JobType;
(function (JobType) {
    JobType["Preprocess"] = "preprocess";
    JobType["Analyze"] = "analyze";
    JobType["SHAPSummary"] = "shap-summary";
    JobType["Predict"] = "predict";
})(JobType || (JobType = {}));
// Which just gives you this object:
console.log('JobType', JobType);
// JobType {
//   Preprocess: 'preprocess',
//   Analyze: 'analyze',
//   SHAPSummary: 'shap-summary',
//   Predict: 'predict'
// }

let someStorage = [];

function someAsyncJob(projectId, connector, job, interval) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // if (connector === '2' && job === 'preprocess') reject('Not found');
            someStorage.push({ projectId, connector, job });
            resolve('OK');
        }, interval);
    });
}

async function timeTestWithPromiseAllAndTwoMaps() {
    const projectId = 111;
    const allConnectors = ['1', '2', '2', null];
    const usedConnectors = [...new Set(allConnectors.filter(Boolean))];
    console.log('usedConnectors', usedConnectors, 'isArray', Array.isArray(usedConnectors));
    const allJobs = Object.values(JobType);

    const allDone = usedConnectors.map(connector => {
        const jobsDone = allJobs.map(job => someAsyncJob(projectId, connector, job, 2000));
        console.log('jobsDone', jobsDone); // pending...

        return Promise.all(jobsDone);
        console.log('check storage', someStorage); // ready!
    });

    console.log('allDone 1', allDone); // [ Promise { <pending> }, Promise { <pending> } ]
    const res = await Promise.all(allDone);
    console.log('res', res); // [ [ 'OK', 'OK', 'OK', 'OK' ], [ 'OK', 'OK', 'OK', 'OK' ] ]
    console.log('allDone 2', allDone); // [ Promise { [ 'OK', 'OK', 'OK', 'OK' ] }, Promise { [ 'OK', 'OK', 'OK', 'OK' ] } ]

    // The same but more short:
    // const res = await Promise.all(usedConnectors.map(async connector => {
    //     await Promise.all(allJobs.map(job => someAsyncJob(projectId, connector, job, 2000)));
    // }));
    // OR
    // const res = await Promise.all(usedConnectors.map(connector => {
    //     return Promise.all(allJobs.map(job => someAsyncJob(projectId, connector, job, 2000)));
    // }));
}

async function timeTestWithPromiseAllAndMap() {
    const projectId = 111;
    const connectors = ['1', '2'];

    const res = await Promise.all(connectors.map(async (connector) => {
        if (!connector) return;

        const jobs = [
            someAsyncJob(projectId, connector, 'preprocess', 2000),
            someAsyncJob(projectId, connector, 'analyze', 2000),
            someAsyncJob(projectId, connector, 'shap-summary', 2000),
            someAsyncJob(projectId, connector, 'predict', 2000),
        ];

        return Promise.all(jobs);
    }));

    console.log('res', res);
}

async function timeTestLONG() {
    const projectId = 111;
    const connectors = ['1', '2'];

    const res = await Promise.all(connectors.map(async (connector) => {
        if (!connector) return;

        await someAsyncJob(projectId, connector, 'preprocess', 2000);
        await someAsyncJob(projectId, connector, 'analyze', 2000);
        await someAsyncJob(projectId, connector, 'shap-summary', 2000);
        await someAsyncJob(projectId, connector, 'predict', 2000);
    }));

    console.log('res', res);
}


let startTime1 = Date.now();
timeTestWithPromiseAllAndTwoMaps().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime1;
    console.log("Time 1 taken in milliseconds: " + timeTaken); // 2010 - 2017 ms

    console.log('storage', someStorage);
});

// console.log('storage', someStorage); // logs empty array

// let startTime2 = Date.now();
// timeTestWithPromiseAllAndMap().then(() => {
//     let finishTime = Date.now();
//     let timeTaken = finishTime - startTime2;
//     console.log("Time 2 taken in milliseconds: " + timeTaken); // 8025 ms
// });

// let startTime3 = Date.now();
// timeTestLONG().then(() => {
//     let finishTime = Date.now();
//     let timeTaken = finishTime - startTime3;
//     console.log("Time 2 taken in milliseconds: " + timeTaken); // 8025 ms
// });

