/*Pour les saisies*/
Number.prototype.formatMoney = function (c, d, t) {
      var n = this,
              c = isNaN(c = Math.abs(c)) ? 2 : c,
              d = d === undefined ? "." : d,
              t = t === undefined ? "," : t,
              s = n < 0 ? "-" : "",
              i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
              j = (j = i.length) > 3 ? j % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }; // Source: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
     
    function ElementReader() {
    this.InputText = function (idInput) {
        var input = document.getElementById(idInput);
        if (input === null) {
          return undefined;
        }
        return input.value;
      };
      this.InputCheckbox = function (idInput) {
        var input = document.getElementById(idInput);
        if (input === null) {
          return undefined;
        }
        return input.checked;
      };
      this.InputInt = function (idInput) {
        var input = document.getElementById(idInput);
        if (input === null) {
          return undefined;
        }
        return parseInt(input.value);
      };
      this.Select = function (idSelect) {
        var select = document.getElementById(idSelect);
        if (select === null) {
          return undefined;
        }
        var idx = select.selectedIndex;
        return select.options[idx].value;
      };
    }
     
    function ElementWriter() {
      this.Tag = function (idTag, value) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.innerHTML = value;
        }
      };
      this.TagCurrency = function (idTag, value) {
        this.Tag(idTag, value.formatMoney(2, ',', '&nbsp;') + '$');
      };
      this.hideElement = function (idTag) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.style.display = 'none';
        }
      };
      this.showElement = function (idTag) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.style.display = 'block';
        }
      };
      this.InputText = function (idTag, value) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.value = value;
        }
      };
      this.InputInt = function (idTag, value) {
        var tag = document.getElementById(idTag);
        if (tag !== null) {
          tag.value = value;
        }
      };
    }