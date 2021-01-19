--
-- EPITECH PROJECT, 2020
-- B-FUN-500-RUN-5-1-funEvalExpr-jean-michel.grondin
-- File description:
-- Spec
--

import Lib (
            parseChar,
            parseAnyChar,
            parseOr,
            parseAnd,
            parseAndWith,
            parseMany,
            parseSome,
            parseUInt,
            removeAllCharOcur,
            parseInt,
            parseTuple,
            parseParentheses,
            countNbThisChar,
            checkNbParentheses,
            parseOperation,
            parseDouble,
            doubleToString,
            safeAddDouble,
            safeSubDouble,
            safeMulDouble,
            safeDivDouble,
            safePowDouble
            )

getSize :: [a] -> Int
getSize [] = 0
getSize (_:xs) = 1 + (getSize xs)

main :: IO ()
main = do
    putStrLn "\n\nParse Char: \n"
    putStr "Parse Char when succed: "
    putStrLn $ if parseChar '1' "123" == Just ('1', "23") then "OK" else "FAIL!"

    putStr "Parse Char when nothing: "
    putStrLn $ if parseChar '2' "123" == Nothing then "OK" else "FAIL!"

    putStr "Parse Char when empty string: "
    putStrLn $ if parseChar '2' "" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Any Char: \n"
    putStr "Parse Any Char when succed: "
    putStrLn $ if parseAnyChar "456" "623" == Just ('6', "23") then "OK" else "FAIL!"

    putStr "Parse Any Char when nothing: "
    putStrLn $ if parseAnyChar "457" "623" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Or: \n"
    putStr "Parse Or when succed: "
    putStrLn $ if parseOr (parseChar 'a') (parseChar 'b') "abcd" == Just (('a') , "bcd") then "OK" else "FAIL!"

    putStr "Parse Or when succed Two: "
    putStrLn $ if parseOr (parseChar 'a') (parseChar 'b') "bcda" == Just (('b') , "cda") then "OK" else "FAIL!"

    putStr "Parse Or when nothing: "
    putStrLn $ if parseOr (parseChar 'a') (parseChar 'b') "xyz" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse And: \n"
    putStr "Parse And when succed: "
    putStrLn $ if parseAnd (parseChar 'a') (parseChar 'b') "abcd" == Just (('a','b') , "cd") then "OK" else "FAIL!"

    putStr "Parse And when succed two: "
    putStrLn $ if parseAnd (parseMany (parseChar 'a')) (parseMany (parseChar 'b')) "aaaabbbcd" == Just (("aaaa","bbb") , "cd") then "OK" else "FAIL!"

    putStr "Parse And when nothing: "
    putStrLn $ if parseAnd (parseChar 'a') (parseChar 'b') "bcda" == Nothing then "OK" else "FAIL!"

    putStr "Parse And when nothing Two: "
    putStrLn $ if parseAnd (parseChar 'a') (parseChar 'b') "acd" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse AndWith: \n"
    putStr "Parse AndWith when succed: "
    putStrLn $ if parseAndWith  (\ x y -> [x,y]) (parseChar 'a') (parseChar 'b') "abcd" == Just ("ab" , "cd") then "OK" else "FAIL!"

    putStr "Parse AndWith when succed two: "
    putStrLn $ if parseAndWith  (\ x y -> [x,y]) (parseMany (parseChar 'a')) (parseMany (parseChar 'b')) "aaaabbbcd" == Just (["aaaa","bbb"] , "cd") then "OK" else "FAIL!"

    putStr "Parse AndWith when nothing: "
    putStrLn $ if parseAndWith  (\ x y -> [x,y]) (parseChar 'a') (parseChar 'b') "bcda" == Nothing then "OK" else "FAIL!"

    putStr "Parse AndWith when nothing Two: "
    putStrLn $ if parseAndWith  (\ x y -> [x,y]) (parseChar 'a') (parseChar 'b') "acd" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Many: \n"
    putStr "Parse Many when succed: "
    putStrLn $ if parseMany (parseChar ' ') "    foobar" == Just ("    ", "foobar") then "OK" else "FAIL!"

    putStr "Parse many when nothing: "
    putStrLn $ if parseMany (parseChar ' ') "foobar    " == Just ("", "foobar    ") then "OK" else "FAIL!"


    putStrLn "\n\nParse Some: \n"
    putStr "Parse Some when succed: "
    putStrLn $ if parseSome (parseAnyChar ['0'..'9']) "42foobar" == Just ("42", "foobar") then "OK" else "FAIL!"

    putStr "Parse Some when nothing: "
    putStrLn $ if parseSome (parseAnyChar ['0'..'9']) "foobar42" == Nothing then "OK" else "FAIL!"

    putStr "Parse Some when only one to parse then nothing left: "
    putStrLn $ if parseSome (parseAnyChar (['0'..'9'] ++ [' '])) "1" == Just ("1", "") then "OK" else "FAIL!"

    putStr "Parse Some when no string passed: "
    putStrLn $ if parseSome (parseAnyChar ['0'..'9']) "" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse UInt: \n"
    putStr "Parse UInt when succed: "
    putStrLn $ if parseUInt "42foobar" == Just (42, "foobar") then "OK" else "FAIL!"

    putStr "Parse UInt when succed 2: "
    putStrLn $ if parseUInt "++++++++++42foobar" == Just (42, "foobar") then "OK" else "FAIL!"

    putStr "Parse UInt when nothing: "
    putStrLn $ if parseUInt "foobar42" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nRemove All Char Ocur: \n"
    putStr "Remove All Char Ocur when succed: "
    putStrLn $ if removeAllCharOcur ' ' "(1 + 2)" == "(1+2)" then "OK" else "FAIL!"

    putStr "Remove All Char Ocur when nothing to remove: "
    putStrLn $ if removeAllCharOcur ' ' "(1+2)" == "(1+2)" then "OK" else "FAIL!"


    putStrLn "\n\nParse Int: \n"
    putStr "Parse Int when succed: "
    putStrLn $ if parseInt "42foobar" == Just (42, "foobar") then "OK" else "FAIL!"

    putStr "Parse Int when succed 2: "
    putStrLn $ if parseInt "++++++++++42foobar" == Just (42, "foobar") then "OK" else "FAIL!"

    putStr "Parse Int when succed 3: "
    putStrLn $ if parseInt "-42foobar" == Just ((-42), "foobar") then "OK" else "FAIL!"

    putStr "Parse Int when succed 4: "
    putStrLn $ if parseInt "++++++---++++42foobar" == Just ((-42), "foobar") then "OK" else "FAIL!"

    putStr "Parse Int when succed 5: "
    putStrLn $ if parseInt "---++++++---++++42foobar" == Just (42, "foobar") then "OK" else "FAIL!"

    putStr "Parse Int when nothing: "
    putStrLn $ if parseInt "foobar42" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Tuple: \n"
    putStr "Parse Tuple when succed: "
    putStrLn $ if parseTuple parseInt "(123,456)foobar" == Just ((123,456) , "foobar") then "OK" else "FAIL!"

    putStr "Parse Tuple when nothing: "
    putStrLn $ if parseTuple parseInt "foobar(123,456)foobar" == Nothing then "OK" else "FAIL!"

    putStr "Parse Tuple when nothing 2: "
    putStrLn $ if parseTuple parseInt "(123 ,456)foobar" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Parentheses: \n"
    putStr "Parse Parentheses when succed simple: "
    putStrLn $ if parseParentheses (parseAnyChar (',':['0'..'9'])) "(123,456)foobar" == Just ("(123,456)" , "foobar") then "OK" else "FAIL!"

    putStr "Parse Parentheses when succed complex: "
    putStrLn $ if parseParentheses (parseAnyChar (',':['0'..'9'])) "((123),(456))foobar" == Just ("((123),(456))" , "foobar") then "OK" else "FAIL!"

    putStr "Parse Parentheses when nothing: "
    putStrLn $ if parseParentheses (parseAnyChar (',':['0'..'9'])) "foobar(123,456)foobar" == Nothing then "OK" else "FAIL!"

    putStr "Parse Parentheses when nothing 2: "
    putStrLn $ if parseParentheses (parseAnyChar (',':['0'..'9'])) "(123 ,456)foobar" == Nothing then "OK" else "FAIL!"

    putStr "Parse Parentheses when nothing 3: "
    putStrLn $ if parseParentheses (parseAnyChar []) "(123 ,456)foobar" == Nothing then "OK" else "FAIL!"

    putStr "Parse Parentheses when nothing 4: "
    putStrLn $ if parseParentheses (parseAnyChar (',':['0'..'9'])) "" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nCountNbThisChar: \n"
    putStr "CountNbThisChar when 2: "
    putStrLn $ if countNbThisChar "86423196435421" '1' == 2 then "OK" else "FAIL!"

    putStr "CountNbThisChar when 0: "
    putStrLn $ if countNbThisChar "86423196435421" '7' == 0 then "OK" else "FAIL!"

    putStr "CountNbThisChar when empty str given: "
    putStrLn $ if countNbThisChar "" '4' == 0 then "OK" else "FAIL!"


    putStrLn "\n\ncheckNbParentheses: \n"
    putStr "checkNbParentheses when 1 parethese: "
    putStrLn $ if checkNbParentheses "86423196435421)" 1 == True then "OK" else "FAIL!"

    putStr "checkNbParentheses when 2 parethese: "
    putStrLn $ if checkNbParentheses "(86423196435421))" 1 == True then "OK" else "FAIL!"

    putStr "checkNbParentheses when incorrect: "
    putStrLn $ if checkNbParentheses "(86423196435421())" 1 == False then "OK" else "FAIL!"

    putStr "checkNbParentheses when empty str given: "
    putStrLn $ if checkNbParentheses "" 1 == False then "OK" else "FAIL!"


    putStrLn "\n\nParse Operation: \n"
    putStr "Parse Operation with add: "
    putStrLn $ if parseOperation '+' "123+456foobar" == Just ((123.0,456.0), "foobar") then "OK" else "FAIL!"

    putStr "Parse Operation whith less: "
    putStrLn $ if parseOperation '-' "123-456foobar" == Just ((123.0,456.0), "foobar") then "OK" else "FAIL!"

    putStr "Parse Operation whith double syntax and int syntax: "
    putStrLn $ if parseOperation '^' "123.0^456foobar" == Just ((123.0,456.0), "foobar") then "OK" else "FAIL!"

    putStr "Parse Operation whith both double syntax: "
    putStrLn $ if parseOperation '^' "123.0^456.0foobar" == Just ((123.0,456.0), "foobar") then "OK" else "FAIL!"

    putStr "Parse Operation when no str passed: "
    putStrLn $ if parseOperation '+' "" == Nothing then "OK" else "FAIL!"

    putStr "Parse Operation when no corresponding operation: "
    putStrLn $ if parseOperation '+' "123-456foobar" == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nParse Double: \n"
    putStr "Parse Double when without dot: "
    putStrLn $ if parseDouble "42foobar" == Just (42.0, "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when with dot: "
    putStrLn $ if parseDouble "42.7foobar" == Just (42.7, "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when succed 2: "
    putStrLn $ if parseDouble "++++++++++42foobar" == Just (42.0, "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when succed 3: "
    putStrLn $ if parseDouble "-42.1foobar" == Just ((-42.1), "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when succed 4: "
    putStrLn $ if parseDouble "++++++---++++42foobar" == Just ((-42.0), "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when succed 5: "
    putStrLn $ if parseDouble "---++++++---++++42.3foobar" == Just (42.3, "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when nothing: "
    putStrLn $ if parseDouble "foobar42" == Nothing then "OK" else "FAIL!"

    putStr "Parse Double when str given empty: "
    putStrLn $ if parseDouble "" == Nothing then "OK" else "FAIL!"

    putStr "Parse Double when more than one dot: "
    putStrLn $ if parseDouble "42..5foobar" == Just (42.5, "foobar") then "OK" else "FAIL!"

    putStr "Parse Double when nothing after the dot: "
    putStrLn $ if parseDouble "42.foobar" == Just (42.0, "foobar") then "OK" else "FAIL!"


    putStrLn "\n\nDouble To String: \n"
    putStr "Double To String with general cases: "
    putStrLn $ if doubleToString (Just (1.123456789)) == Just ("1.123456789") then "OK" else "FAIL!"

    putStr "Double To String with the limit of rounding: "
    putStrLn $ if doubleToString (Just (1.23456789123456789)) == Just ("1.234567891234568") then "OK" else "FAIL!"

    putStr "Double To String when nothing passed: "
    putStrLn $ if doubleToString Nothing == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nAdd Double: \n"
    putStr "Simple Add: "
    putStrLn $ if safeAddDouble (Just 10.0) (Just 12.0) == Just (22.0) then "OK" else "FAIL!"

    putStr "Simple Add with decimal: "
    putStrLn $ if safeAddDouble (Just 10.22) (Just 5.11) == Just (15.330000000000002) then "OK" else "FAIL!"

    putStr "Nothing first param: "
    putStrLn $ if safeAddDouble Nothing (Just 10.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing second param: "
    putStrLn $ if safeAddDouble (Just 10.0) Nothing == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nSub Double: \n"
    putStr "Simple Sub: "
    putStrLn $ if safeSubDouble (Just 12.0) (Just 10.0) == Just (2.0) then "OK" else "FAIL!"

    putStr "Simple Sub two: "
    putStrLn $ if safeSubDouble (Just 10.0) (Just 12.0) == Just (-2.0) then "OK" else "FAIL!"

    putStr "Simple Sub with decimal: "
    putStrLn $ if safeSubDouble (Just 10.22) (Just 5.11) == Just (5.11) then "OK" else "FAIL!"

    putStr "Nothing first param: "
    putStrLn $ if safeSubDouble Nothing (Just 10.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing second param: "
    putStrLn $ if safeSubDouble (Just 10.0) Nothing == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nmul Double: \n"
    putStr "Simple mul: "
    putStrLn $ if safeMulDouble (Just 10.0) (Just 12.0) == Just (120.0) then "OK" else "FAIL!"

    putStr "Simple mul with decimal: "
    putStrLn $ if safeMulDouble (Just 10.22) (Just 5.11) == Just (52.2242) then "OK" else "FAIL!"

    putStr "Nothing first param: "
    putStrLn $ if safeMulDouble Nothing (Just 10.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing second param: "
    putStrLn $ if safeMulDouble (Just 10.0) Nothing == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nDiv Double: \n"
    putStr "Simple Div: "
    putStrLn $ if safeDivDouble (Just 12.0) (Just 10.0) == Just (1.2) then "OK" else "FAIL!"

    putStr "Simple Div two: "
    putStrLn $ if safeDivDouble (Just 10.0) (Just 12.0) == Just (0.8333333333333334) then "OK" else "FAIL!"

    putStr "Simple Div by 0: "
    putStrLn $ if safeDivDouble (Just 10.0) (Just 0.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing first param: "
    putStrLn $ if safeDivDouble Nothing (Just 10.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing second param: "
    putStrLn $ if safeDivDouble (Just 10.0) Nothing == Nothing then "OK" else "FAIL!"


    putStrLn "\n\nPow Double: \n"
    putStr "Simple Pow: "
    putStrLn $ if safePowDouble (Just 12.0) (Just 10.0) == Just (61917364224.0) then "OK" else "FAIL!"

    putStr "Simple Pow two: "
    putStrLn $ if safePowDouble (Just 1.0) (Just 2.0) == Just (1.0) then "OK" else "FAIL!"

    putStr "Nothing first param: "
    putStrLn $ if safePowDouble Nothing (Just 10.0) == Nothing then "OK" else "FAIL!"

    putStr "Nothing second param: "
    putStrLn $ if safePowDouble (Just 10.0) Nothing == Nothing then "OK" else "FAIL!"


    -- putStr "Nothing second param shoudl fail: "
    -- putStrLn $ if safePowDouble (Just 10.0) Nothing == Just (5.2) then "OK" else "FAIL!"

-- Fair un script qui grep le nb de OK et dit n tests passed
-- et qui grep el nb de FAil et dit n tests failed and print thoses who failed
