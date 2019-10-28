let users = [{ id: 1,
    name: 'bob', },
    {
    id: 2,
    name: 'sally', },
    {
    id: 3,
    name: 'bob',
        age: 30,
    }];

let result = users.reduce(function (r, a) {
    console.log('r is ', r)
    console.log('a is ', a)
    console.log('a.name is ', a.name)
    console.log(" r[a.name]",  r[a.name])
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
    }, Object.create(null));

console.log(result);