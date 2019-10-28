-- A. Return the name of the salesperson with the 3rd highest salary.
WITH CTE AS
(
    SELECT Name, Salary, RN = ROW_NUMBER() OVER (ORDER BY Salary DESC)
    FROM dbo.Salesperson
)
SELECT Name
FROM CTE
WHERE RN = 3

/* Create a new roll­up table BigOrders(where columns are CustomerID, TotalOrderValue), and insert into that table customers whose total Amount across all orders is greater than 1000  */

If(OBJECT_ID('BigOrders') Is Not Null)
Begin
    Drop Table BigOrders
End

CREATE TABLE BigOrders
(
	CustomerID INT NOT NULL,
    TotalOrderValue MONEY NOT NULL
)

INSERT INTO BigOrders(CustomerID, TotalOrderValue) 
(SELECT O.[CustomerID], Sum(O.CostOfUnit*O.NumberOfUnits)
FROM Orders O
GROUP BY O.[CustomerID]
HAVING Sum(O.CostOfUnit*O.NumberOfUnits) > 1000);


SELECT * FROM BigOrders

  
/* Return the total Amount of orders for each month, ordered by year, then month (both in descending order)  */

SELECT Year(O.OrderDate) as [Year], Month(O.OrderDate) as [Month], Sum(O.CostOfUnit*O.NumberOfUnits) as [TotalAmount]
FROM Orders O
GROUP BY Year(O.OrderDate), Month(O.OrderDate)
ORDER BY Year(O.OrderDate) DESC, Month(O.OrderDate) DESC


--Return the names of all salespeople that have an order with George

SELECT DISTINCT Name 
FROM Salesperson SP
INNER JOIN Orders O
ON SP.SalespersonID = O.SalespersonID
WHERE O.CustomerID IN
			(SELECT CustomerID
			 FROM   Customer C
			WHERE   C.Name = 'George')

--Return the names of all salespeople that do not have any order with George 
SELECT DISTINCT Name
FROM Salesperson SP
WHERE SP.SalespersonID NOT IN
			(SELECT O.SalespersonID
			 FROM   Customer C
			 INNER JOIN Orders O
			 ON C.CustomerID = O.CustomerID			 
			 WHERE   C.Name = 'George')

--Return the names of salespeople that have 2 or more orders. 
SELECT SP.Name
FROM Salesperson SP
INNER JOIN Orders O
ON SP.SalespersonID = O.SalespersonID
GROUP BY SP.Name, SP.SalespersonID
HAVING COUNT( O.SalespersonID ) > 1