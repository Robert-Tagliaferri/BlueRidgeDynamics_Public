const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
//var color = require('color');
app.use(express.json())

// Setup the DB
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

// list of people, gender, age, name, email, address
db.serialize(function () {
    // Add additional DB setup inside this function
    db.run('CREATE TABLE score_data (name TEXT, score INT)')
    var stmt = db.prepare('INSERT INTO score_data VALUES (?, ?)')

    data = [['Kyle', 1], ['Danny', 5], ['Drew', 0], ['Duane', 1], ['Jacob', 2], ['Michael', 2]];
    data.forEach(x => {
        stmt.run(x[0], x[1])
    });


    stmt.finalize()

    db.each('SELECT rowid AS id, name, score FROM score_data', function (err, row) {
        //console.log(row.id + ': ' + row.info)
        console.log(row)
    })

    db.run('CREATE TABLE people_data (first_name TEXT, last_name TEXT, gender TEXT, age INT)')
    stmt = db.prepare('INSERT INTO people_data VALUES (?, ?, ?, ?)')
    var str=fs.readFileSync('data.csv').toString();
    var arr=str.split(/\,|\n/);
    for(var i =7;i<arr.length-7;i=i+7){ 
        stmt.run(arr[i+2],arr[i+3],arr[i],arr[i+5])
    }
    stmt.finalize()
    /*
     db.each('SELECT rowid AS id, first_name, last_name, gender, age FROM people_data', function (err, row) {
        //console.log(row.id + ': ' + row.info)
        console.log(row)
    })
    */
})

//aggregates gender data
app.get('/countGender', (req, res) => {
    db.all('SELECT gender, COUNT(gender) as total FROM people_data GROUP BY gender', (err, rows) => {
        if (err) {
            console.log('DB Error ', err);
            res.send('[]')
        } else {
            //format to chart.js input
            const labels = [];
            const dataset = {
                data: [],
                backgroundColor: []
            };
            rows.forEach(row => {
                labels.push(row.gender);
                dataset.data.push(row.total);
                dataset.backgroundColor.push(row.gender.toLowerCase() === 'male' ? '#26c6da' : '#ef5350');
            });

            const result = {
                labels: labels,
                datasets: [dataset]
            };
            res.json(result);
        }
    })
});
//gets age data for histogram
app.get('/countAge/:numBins?', (req,res)=>{
    var numBuckets= req.params.numBins ||5;
    
    console.log(req.params.numBins);
    var max;
    var labels=[];
    var dataset={
        label:'Company Ages',
        data:[],
        backgroundColor:[]
    };
    //we get the max in order to determine how to set up our buckets
    db.get('Select MAX(age) as total FROM people_data',(err,rows)=>{
        if(err){
            console.log('DB Error ',err)
            res.send('[]')
        }else{
            max=rows.total;
        }
        //console.log('ENDMAX')
        //console.log(max)
    });
    //console.log('POSTmax')
    db.all('SELECT age FROM people_data ORDER BY age',(err,rows)=>{
        var min=-1;
        var inc = -1;
        var numElements=0;
        //console.log(inc)
        var bucketNum=0;
        if(err){
            console.log('DB Error ',err)
            res.send('[]')
        } else{
            console.log("countAgeHit")
            rows.forEach(row=> {
                //console.log('badIdea')
                numElements++;
                //we can skip querying for the min
                if(min==-1){
                    min=row.age;
                    //while it won't allow us to stop at the highest value, it will allow 
                    //us to no worry about rounding errors
                    inc=Math.ceil((max-min)/(numBuckets));
                }
                //if age is less than the current max of the bucket                    
                    if(row.age<(inc*bucketNum)+min){
                    //increment that data element
                         dataset.data[bucketNum-1]+=1;
                    }else{
                        //we need to see how many bins we might skip
                        while(row.age>=(inc*bucketNum)+min){

                            //else create a label for the new bracket
                            labels.push('['+ Math.ceil(inc*(bucketNum)+min) +' - ' + Math.floor((inc*(bucketNum+1)+min))+']')                        
                            //inc bucketnum until we hit the right target
                            bucketNum++;
                            //give the bucket a value of zero
                            dataset.data[bucketNum-1]=0;
                            dataset.backgroundColor.push('#25C6DA')
                        }
                     //update bucket
                        dataset.data[bucketNum-1]+=1;

                    }
            });
            /*
            var colour = color.rgb(37,198,218)
            //console.log('reached')
            dataset.data.forEach(count=>{
                console.log(Math.exp((count)/(numElements))-.75)
                dataset.backgroundColor.push(colour.mix(color("red"), Math.exp((count)/(numElements))-.75).hex())
            })
            */
            console.log(dataset)

        }
        const result = {
            labels: labels,
            datasets: [dataset]
        }
        res.json(result);
    });
});

//inserts a row into the people_data table
app.post('/addPerson', (req, res) => {
    console.log(req.body)
    db.run("INSERT INTO people_data ('first_name', 'last_name', 'gender', 'age') VALUES (?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.gender, req.body.age], function (err, row) {
            if (err) {
                //console.log("addPersonMiss")
                res.json(false)
            } else {
                //console.log("addPersonHit")
                res.json(true)
            }
        }
    )
})

app.get('/getPeople', (req, res) => {
    db.all('SELECT first_name,last_name, gender, age FROM people_data ORDER BY Last_name', (err, rows)=> {
        if (err) {
            console.log('DB Error ', err)
            res.send([]);
        } else {
            //console.log("getPeopleHit")
            res.send(JSON.stringify(rows))
        }
    })
})

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.redirect('/index.html'))
app.get('/scores', (req, res) => {
    db.all('SELECT rowid as id, name, score from score_data', (err, rows) => {
        if (err) {
            console.log('DB Error ', err)
            // send an empty list to not error out the client that is expecting json
            res.send('[]')
        } else {
            res.send(JSON.stringify(rows))
        }
    })
});


app.use(express.static('frontend/dist/'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// db.close()
