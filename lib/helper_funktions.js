'use strict';

async function reorder_prio(prio) {
    return new Promise(async (resolve) => {
        let prio_neu;
        try {
            if(prio == 1){
                prio_neu = 4;
            }
            if(prio == 2){
                prio_neu = 3;
            }
            if(prio == 3){
                prio_neu = 2;
            }
            if(prio == 4){
                prio_neu = 1;
            }       
        }
        catch (e) {
            
        }
        resolve(prio_neu);
    });
}


module.exports = {
    reorder_prio
    
    
};