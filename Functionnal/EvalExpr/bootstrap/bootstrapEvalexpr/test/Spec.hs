-- main :: IO ()
-- main = putStrLn "Test suite not yet implemented"

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
            parseTuple
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

