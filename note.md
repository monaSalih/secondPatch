function getBookHandler(req,res){
console.log("getBookHandler");
let bookName2 =req.query.bookName;
BookStorage.find ({bookName:bookName2 }, function(err,bookOwner){
    if(err){
        console.log("error can't found data");
    }else{
        console.log(bookOwner);
    }
})

}


///////////////////////
const bookSchema = new mongoose.Schema({
    bookName: String,
    bookDesc:String, 
    pageNumber:Number,
  });

  const BookStorage = mongoose.model('booksCol1', bookSchema);

  function seedBookData(){
      const bookExam01=new BookStorage({
        bookName:'The Life',
        bookDesc:'Gabriel Russo had been born under a dark cloud. He knew his history like the back of his hand, his mother made sure of that. He knew what blood ran',
        pageNumber:'120'
      })
      const bookExam02=new BookStorage({
        bookName:'Greenlights',
        bookDesc:'From the Academy Award-winning actor, an unconventional memoir filled with raucous stories, outlaw wisdom, and lessons learned the hard way about living with greater satisfaction.',
        pageNumber:'330'
      })
      const bookExam03=new BookStorage({
        bookName:'It Ends with Us: A Novel',
        bookDesc:'Combining a captivating romance with a cast of all-too-human characters, Colleen Hoover’s It Ends With Us is an unforgettable tale of love that comes at the ultimate price.',
        pageNumber:'250'
      })
      bookExam01.save();
      bookExam02.save();
      bookExam03.save();
  }

//   seedBookData()
////////////////////////////////
// server.get('/getData',getBookHandler);
// //////**getBook */
// ////**localhost/getData?bookName=Greenlights */
// function getBookHandler(req,res){}
///////////////////////////////

LOCALMONGO=mongodb://localhost:27017/bookExam

const mongoose = require('mongoose');
mongoose.connect(process.env.LOCALMONGO,{ useNewUrlParser: true, useUnifiedTopology: true });