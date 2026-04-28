// Problem 1:(LIS) Given an integer array nums, return the length of the longest strictly increasing subsequence.
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
#include <bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    vector<int> arr(n);
    for(int i=0; i<n; i++){
        int temp;
        cin>>temp;
        arr[i]=temp;
    }
    int max_count=INT_MIN;
    for(int i=0; i<n-1; i++){
        int count=1;
        for(int j=i+1; j<n; j++){
            int temp=max(arr[j], arr[j-1]);
            if(temp==arr[j]){
                count++;
            }
        }
        max_count=max(max_count, count);
    }
    cout<<max_count;
    return 0;
}