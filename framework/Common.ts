export class Common {
  static stringFormat(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]);
    }
    return str;
  }

  static getUrlLocale(url: string): string {
    const locale = /com\/([^\/]+)/.exec(url)[1];
    return locale;
  }

  static getArrayDuplicateElements(array: string[]): string[] {
    const duplicates = array.filter((item, index) => array.indexOf(item) !== index);
    return duplicates;
  }

  static async delay(ms: number) {
    new Promise(r => setTimeout(r, ms));
  }

  static getPriceString(priceStr: string): string {
    const currency = priceStr.replace(/,/g, '').split('$')[1].trim();
    return parseFloat(currency).toFixed(2);
  }

  static getBuildIdFromQuoteUrl(url: string): string {
    let paramsBlock = url.split("?")[1];
                let paramsMap = paramsBlock.split('&').reduce((p, c) => {
                    let components = c.split('=');
                    p[components[0]] = components[1]
                    return p;
                }, new Map<string, string>());
    const urlParams = new URLSearchParams(paramsBlock);
    const buildId = urlParams.get('submissionID');
    return buildId;
  }

  static async waitForMutationToStop(elem, noMutationDuration = 3000, timeout = 60000, waitForFirstMutation = true) {
    return elem.evaluate(async (elem, [noMutationDuration, timeout, waitForFirstMutation]) => {
      //Resolve when a mutation occurs on elem.
      const waitForMutation = async (elem) => {
        let html = elem.innerHTML;
        
        return new Promise<void>((resolve, reject) => {
          new MutationObserver((mutationRecords, observer) => {
            if(elem.innerHTML != html) {
              console.log("Mutation detected.");
              resolve();
              observer.disconnect();
            }
          })
          .observe(document.documentElement, {
            childList: true,
            attributes: true,
            characterData: true,
            subtree: true,
          });
        })
      };
      
      let timeoutId, noMutationTimeoutId;
      return Promise.race([
        //Reject when `timeout` ms have passed
        new Promise((resolve, reject) => timeoutId = setTimeout(reject, timeout, `Reached timeout of ${timeout} ms while waiting for mutation to stop.`)),
        //Resolve when `noMutationDuration` ms have passed since the last mutation.
        new Promise(async (resolve, reject) => {
          //If requested, wait for the first mutation to occur. This allows the function to wait longer than `noMutationDuration` ms for the first mutation to occur. Once the first mutation occurs, the function will resume "normal" behavior - that is, it will wait until no mutations occur for `noMutationDuration` ms before resolving.
          if(waitForFirstMutation) {
            console.log("Waiting for first mutation.");
            await waitForMutation(elem);
          }
          while(true) {
            noMutationTimeoutId = setTimeout(resolve, noMutationDuration) //We reset this timer every time a mutation occurs. So, when it finally "executes", we know that `noMutationDuration` has passed since the last mutation.
            console.log(`Waiting ${noMutationDuration} ms for mutation.`);
            await waitForMutation(elem);
            if(!noMutationTimeoutId) {
              break;
            }
            clearTimeout(noMutationTimeoutId);
          }
        }),
      ])
        .then(
          (value) => {
            console.log(`${noMutationDuration} ms have elapsed since this function was called or the last mutation was detected. Fulfilling.`);
          }, (reason) => {
            console.log(`${timeout} ms have elapsed without a ${noMutationDuration} ms period devoid of mutation. Rejecting.`);
            throw new Error(reason);
          }
        )
        //Clear timeouts - if we don't, Node will refuse to exit until active timeouts expire
        .finally(() => {
          clearTimeout(timeoutId);
          clearTimeout(noMutationTimeoutId);
          noMutationTimeoutId = null;
        })
    },
    [noMutationDuration, timeout, waitForFirstMutation]);
  }
}

  