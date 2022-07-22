const Book = require('../models').Book;
const XLSX = require('xlsx');

module.exports = {
    async import(req, res){
        let wb = XLSX.read(req.files.path.data, {type:"buffer"});
        const sheets = wb.SheetNames;
        
        if(sheets.length > 0) {
            const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
            const books = data.map(row => ({
                title: row['Title'],
                total_pages: row['Pages'],
                isbn: row['ISBN'],
                author: row['Author'],
                publisher: row['Publisher']
            }))
            // console.log(books);
            await Book.bulkCreate(books);
        }

        return res.status(200).json({
            success: true,
            message: "Success import!",
        });
    },
    
    async export(req, res){
        const books = await Book.findAll({
            attributes: [
                'id', 
                'title', 
                'total_pages', 
                'isbn', 
                'author',
                'publisher'
            ],
            raw: true
        }); 
        const headings = [
            ['ID', 'Title', 'Pages', 'ISBN', 'Author', 'Publisher']
        ]; 
    
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(books, { 
            origin: 'A2', 
            skipHeader: true 
        });
        XLSX.utils.sheet_add_aoa(worksheet, headings); 
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Books');
    
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' }); 
        res.attachment('books.xlsx');
    
        return res.send(buffer);
    }
}