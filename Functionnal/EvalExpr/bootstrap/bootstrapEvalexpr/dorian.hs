printmoisa :: String -> IO()
printmoisa a = putStrLn a

type Parser a = String -> Maybe (a, String)

parseChar :: Char -> Parser Char
parseChar 