make tests_run > tmp_tests_launching_file
nbSuceed=$(grep "OK" < tmp_tests_launching_file | wc -l)
testsFailed=$(grep "FAIL" < tmp_tests_launching_file)
nbFailed=$(grep "FAIL" < tmp_tests_launching_file | wc -l)

echo -n "\nThere was "
echo -n $nbSuceed
echo -n " tests passed and "
echo -n $nbFailed
echo " failed"

if [ $nbFailed != 0 ]; then
    echo "\nFailed tests are:\n"
    echo $testsFailed "\n"
    fi

rm tmp_tests_launching_file