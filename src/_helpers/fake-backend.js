import { Availability } from './'

export function configureFakeBackend() {
    // array in local storage for user records
    let users = JSON.parse(localStorage.getItem('users')) && [{ 
        id: 1,
        firstName: 'Joe',
        lastName: 'Bloggs',
        jobTitle: 'developer',
        age: '45',
        availability: Availability.User,
    },
    {
        id: 2,
        firstName: 'Jim',
        lastName: 'Smith',
        jobTitle: 'developer',
        age: '25',
        availability: Availability.User,
    },
    {
        id: 3,
        firstName: 'Ann',
        lastName: 'Jeffersson',
        jobTitle: 'team lead',
        age: '37',
        availability: Availability.User,
    },
    {
        id: 4,
        firstName: 'Paula',
        lastName: 'Määttä',
        jobTitle: 'CEO',
        age: '65',
        availability: Availability.User,
    },
    {
        id: 5,
        firstName: 'Pekka',
        lastName: 'Virtanen',
        jobTitle: 'developer',
        age: '25',
        availability: Availability.User,
    },
    {
        id: 6,
        firstName: 'Bill',
        lastName: 'Murphy',
        jobTitle: 'junior developer',
        age: '23',
        availability: Availability.User,
    },
    {
        id: 7,
        firstName: 'Laura',
        lastName: 'Jones',
        jobTitle: 'UX/UI designer',
        age: '33',
        availability: Availability.User,
    },
    {
        id: 8,
        firstName: 'Mikko',
        lastName: 'Haatainen',
        jobTitle: 'lead developer',
        age: '47',
        availability: Availability.User,
    },
    {
        id: 9,
        firstName: 'Teija',
        lastName: 'Mikkonen',
        jobTitle: 'cleaner',
        age: '17',
        availability: Availability.User,
    },
    {
        id: 10,
        firstName: 'Svetlana',
        lastName: 'Backman',
        jobTitle: 'reporter',
        age: '37',
        availability: Availability.User,
    }, 
];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'GET':
                        return getUserById();
                    case url.endsWith('/users') && method === 'POST':
                        return createUser();
                    case url.match(/\/users\/\d+$/) && method === 'PUT':
                        return updateUser();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getUsers() {
                return ok(users);
            }

            function getUserById() {
                let user = users.find(x => x.id === idFromUrl());
                return ok(user);
            }
    
            function createUser() {
                const user = body();                

                // assign user id and a few other properties then save
                user.id = newUserId();
                user.dateCreated = new Date().toISOString();
                //delete user.confirmPassword;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            function updateUser() {
                let params = body();
                let user = users.find(x => x.id === idFromUrl());                

                // update and save user
                Object.assign(user, params);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            function deleteUser() {
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }
    
            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newUserId() {                
                return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            }            
        });
    }
}