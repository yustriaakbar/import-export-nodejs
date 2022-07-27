## Installation

Clone project dan lakukan npm install 

```bash
npm install
```

Setup database di file config.json (database menggunakan mysql). Kemudian lakukan migrate dengan command berikut :
```bash
npx sequelize-cli db:migrate
```

Run project
```bash
npm run start
```

## List Routes
```python
localhost:3001/api/book/import (method post untuk import)
localhost:3001/api/book/export (method get untuk download)
```
