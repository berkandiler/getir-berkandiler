const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../app');





chai.use(chaiHttp);

//Post testi 

describe('/POST filter',()=>{
    it('POST filter',(done)=>{
        const filter={
            startDate:"2017-01-07",
            endDate:"2017-01-08",
            maxCount:4600,
            minCount:4400
        }
        chai.request(server).post('/')
        .send(filter)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.be.property('code');
            res.body.should.be.property('msg');
            res.body.should.be.property('records');

            done();
        })

        
    });
});