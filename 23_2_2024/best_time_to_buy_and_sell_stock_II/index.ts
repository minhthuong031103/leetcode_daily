//[7,1,5,3,6,4]

// => buy at 1, sell at 5, buy at 3, sell at 6
// => profit = 4 + 3 = 7
// => buy at 1, sell at 6 , profit = 5 => not the case

we will use two pointers to keep track of the buy and sell prices
i=0 j=i+1
if prices[i]>prices[j] increment i and j by 1
if prices[i]<prices[j] increment j by 1 also increment the profit by prices[j]-prices[i]

