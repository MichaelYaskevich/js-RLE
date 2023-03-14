# js-RLE
Run-length encoding (RLE)

**Пример запуска:**

js-RLE>node src/rle.js code jump resources/in.txt resources/out_for_code.txt

**code** - мод для кодирования, можно выбрать **decode** для декодирования\
**jump** - вариант реализации rle, можно выбрать **escape**\
**resources/in.txt** - файл к которому применить функцию кодирования или декодирования\
**resources/out_for_code.txt** - файл для записи результата

После выполнения команды кодирования можно выполнить декодирование:

js-RLE>node src/rle.js decode jump resources/out_for_code.txt resources/out_for_decode.txt

Тогда в файле resources/out_for_decode.txt будет лежать исходная строка.

