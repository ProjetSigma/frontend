export class Levenshtein {
  static levenshtein(a, b) {
    var VALUE_INSERT = 0.4;
    var VALUE_DELETE = 3;
    var VALUE_SUBST = 2;


    if (a.length === 0) return b.length
    if (b.length === 0) return a.length
    let tmp, i, j, prev, val

    var row = Array(a.length + 1)
    // init the row
    for (i = 0; i <= a.length; i++) {
      row[i] = i
    }

    for (i = 1; i <= b.length; i++) {
      prev = i
      for (j = 1; j <= a.length; j++) {
        if (b[i-1] === a[j-1]) {
          val = row[j-1] // match
        } else {
          val = Math.min(row[j-1] + VALUE_SUBST, // substitution
                Math.min(prev + VALUE_INSERT,     // insertion
                         row[j] + VALUE_DELETE))  // deletion
        }
        row[j - 1] = prev
        prev = val
      }
      row[a.length] = prev
    }
    return row[a.length]
  }

  static permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
      var cur, memo = memo || [];

      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }

      return results;
    }

    return permute(inputArr, Array(0));
  }

  static compare_string_arrays(first, second) {
      //compare the sentences first and second according to levenshtein distance
      //first : a sentence from the db
      //second : the sentence which was writen by the user
      //returns a sum

      var permutations = this.permutator(first);
      var sum = 10000;
      for (var i = 0; i < permutations.length; i++) {
         var new_sum = 0;
  	     for (var j=0; j<Math.min(first.length,second.length);j++){
  	        new_sum += this.levenshtein(permutations[i][j],second[j]);
  	     }
         if (new_sum<sum){
           sum=new_sum;
         }
      }
      return sum;
  }
}