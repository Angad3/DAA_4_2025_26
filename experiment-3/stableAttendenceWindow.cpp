#include<iostream>
#include<unordered_map>
#include<algorithm>
using namespace std;
int main(){
  unordered_map<int, int> mp;
  int n,sum=0,ans=0;
  cin>>n;
  mp[0]=-1;
  for(int i=0;i<n;i++){
    char att;
    cin>>att;
    if(att=='P'){
      sum++;
    }else{
      sum--;
    }
    if(mp.find(sum) != mp.end()){
      ans = max(ans, i - mp[sum]);
    }
    else{
      mp[sum] = i;
    }
  }
  cout<<ans;
  return 0;
}
