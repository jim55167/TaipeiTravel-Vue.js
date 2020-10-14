git pages：https://jim55167.github.io/TaipeiTravel-Vue.js/

## feat：
### 步驟一

問題：
1.因API的照片格式整個串接再一起，因而出現格式錯誤
2.有一筆資料內的address沒有地區
![](https://i.imgur.com/eqpGU5o.png)

解決方法：
呼叫API前，先將圖片分割成陣列，
使用了split與splice涵式

解題：
1.先查找字符串中的http://
2.從索引0的位置開始尋找，並刪除一個元素
![](https://i.imgur.com/mpw2ozt.png)
3.將item.file指向imgList
4.判斷address裡的資料是否為()裡的內容，是的話回傳空字串
![](https://i.imgur.com/EAj1zbh.png)

### 步驟二

問題：
1.資料會篩選地區之內容，因此需要判斷

解題：
1.判斷選單有沒有觸發
2.判斷data % page_size是否能夠整除
3.判斷index是否 < (vm.page_size * pageNumber)
4.判斷(index+1)，是否等於計算值，當索引值=16時，則頁數+1
※每頁16筆資料，索引值從0開始
5.篩選判斷 filter 有沒有資料
6.將area資料，帶入areaItem的索引值
![](https://i.imgur.com/w7hHAKV.png)

![](https://i.imgur.com/ld9OhGI.png)

### 步驟三

問題：
該如何將地區push至selected

解決方式:
1.使用substr()函式判斷要抓取的地區
2.將資料push至location
![](https://i.imgur.com/Y6XmRuR.png)

### 步驟四

問題：
如何點擊呼叫lightBox與關閉

解決方式：
1.lightBox預設false
2.areaDetail預設為空陣列
3.將參數push至areaDetail
4.將值帶入html後，因為資料為陣列，判斷areaDetail的長度是否 > 0
5.若要關閉LightBox則反之判斷是否 < 0，製作一個function，將其陣列長度刪除
![](https://i.imgur.com/JnlQcuc.png)

![](https://i.imgur.com/9Jd6tXf.png)

![](https://i.imgur.com/QlliHq0.png)




