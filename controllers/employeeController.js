// const express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const Employee = mongoose.model('Employee');

// // create employee get method
// router.get('/', (req, res) => {
//     res.render("employee/addOrEdit", {
//         viewTitle: "Add Employee"
//     });
// });

// // http post method
// router.post('/', (req, res) => {
//     if (req.body._id == '')
//         insertRecord(req, res);
//     else
//         updateRecord(req, res);
// });
// // to insert data in database function
// function insertRecord(req, res) {
//     var employee = new Employee();
//     employee.fullName = req.body.fullName;
//     employee.email = req.body.email;
//     employee.phone = req.body.phone;
//     employee.city = req.body.city;
//     employee.save((err, doc) => {
//         if (!err)
//             res.redirect('employee/list');
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("employee/addOrEdit", {
//                     viewTitle: "Insert Employee",
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record insertion : ' + err);
//         }
//     });
// }

// // to update employee data function
// function updateRecord(req, res) {
//     Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//         if (!err) { res.redirect('employee/list'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("employee/addOrEdit", {
//                     viewTitle: 'Update Employee',
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }

// // to get employee list get method
// router.get('/list', (req, res) => {
//     let testData =[];
//     Employee.find((err, docs) => {
//         if (!err) {
//             docs.forEach(element => {
//                 testData.push(element)
//             });
//             res.render("employee/list", {
               
               
               
//             });
           

//         }
//         else {
//             console.log('Error in retrieving employee list :' + err);
//         }
//     });
// });

// // handle validation error method
// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'fullName':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             case 'email':
//                 body['emailError'] = err.errors[field].message;
//                 break;
//             default:
//                 break;
//         }
//     }
// }

// // update employee get method or getemployee by id 
// router.get('/:id', (req, res) => {
//     Employee.findById(req.params.id, (err, doc) => {
//         if (!err) {
//             res.render("employee/addOrEdit", {
//                 viewTitle: "Update Employee",
//                 employee: doc
//             });
//         }
//     });
// });

// // delete employee method 
// router.get('/delete/:id', (req, res) => {
//     Employee.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) {
//             res.redirect('/employee/list');
//         }
//         else { console.log('Error in employee delete :' + err); }
//     });
// });

// module.exports = router;


const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;