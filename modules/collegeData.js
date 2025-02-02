
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
};

let dataCollection = null;

const fs = require('fs');
const path = require('path');



function initialize() {
    return new Promise((resolve, reject) => {  // Fix: 'promise' → 'Promise'
        fs.readFile(path.join(__dirname,"/../data/students.json"), "utf8", (error, fileContent) => {
            if (error) {
                reject('Error: Cannot read students.json');
                return;
            } 
            let students = JSON.parse(fileContent);
            
            fs.readFile(path.join(__dirname,'/../data/courses.json'), 'utf8', (error, fileContent) => {
                if (error) {
                    reject('Cannot read courses.json');
                    return;
                }
                let courses = JSON.parse(fileContent);
                dataCollection = new Data(students, courses);
                resolve();
            });
        }); // This was missing
    }); // This was missing
}


function getAllStudents() {
    return new Promise((resolve,reject) => {
        if (dataCollection.students.length === 0) {
            reject('no results returned');
        } else {
            resolve(dataCollection.students);
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        let TAs = [];
        dataCollection.students.forEach((student) => {
            if (student.TA) {
                TAs.push(student);
            }            
        });
        if (TAs.length === 0) {
            reject('Results were not found')
        } else {
            resolve(TAs)
        }
    });
}

function getCourses() {
    return new Promise((resolve,reject) => {
        if (dataCollection.courses.length === 0) {
            reject('Cannot return resulrs');
        } else {
            resolve(dataCollection.courses);
        }
    });
}


module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
};