<script>
    import { onMount, onDestroy } from 'svelte';

    // Props
    export let data = [];
    export let titles

    // State
    let flashing = false;
    let forgotten = false;
    let chosen = [];

    // Actions
    const next = () => {
        forgotten = false;
        current ++;
    }

    const set = data => {
        forgotten = false;
        flashing = false;
        order = createCardOrder(data.length);
        current = 0;
    }

    const createCardOrder = length => {
        const randomSort = (_, __) => 0.5 - Math.random();
        let order = [];
        for(let i = 0; i < length; i++){
            order.push(i)
        }
        order.sort(randomSort);
        return order;
    }

    const keyAction = e => {
        if(flashing && (e.keyCode === 82 || e.keyCode === 75 || e.keyCode === 76)){
            e.preventDefault();
            if (e.keyCode === 82) {
                // R Key
                set(data);
            }
            else if (e.keyCode === 75) {
                // K Key
                forgotten = true;
            }
            else if (e.keyCode === 	76) {
                // L key
                next();
            }
        }
    }

    // Logic
    let order = [];
    let current = 0;
    $: set(data);

    $: if(data.length > 5){
        if(current > 3 * data.length / 4) {
            order = createCardOrder(data.length);
            current = 0;
        }
    } else {
        if(current >= data.length){
            current = 0;
        }
    }

    onMount(() => {
        window.scrollTo(0,document.body.scrollHeight);
        window.addEventListener('keydown', keyAction);
    });
    onDestroy(() => {
        window.removeEventListener('keydown', keyAction);
    })
</script>

{#if !flashing}
    <form>
        <h2>Choose recto information :</h2>
        {#each titles as title}
            <label>
                <input type=checkbox bind:group={chosen} value={title}>
                {title}
            </label>
        {/each}
    </form>
    <button class="form-card__button" on:click="{() => flashing = true}">Start Flashing</button>
{:else}
    <div class="card">
        {#if !forgotten}
            {#each chosen as choice}
                <p>{data[order[current]][choice]}</p>
            {/each}
        {:else}
            {#each titles as choice}
                <p class="forgotten">{data[order[current]][choice]}</p>
            {/each}
        {/if}
    </div>
    <div class="capsule">
        <div>
            {#if !forgotten}
                <button class="form-card__button blue" on:click={() => set(data)}>Reset</button>
                <button class="form-card__button blue" on:click={()=>forgotten = true}>Check</button>
                <button class="form-card__button green"  on:click={next}>Got it !</button>
            {:else}
                <button class="form-card__button blue" on:click={() => set(data)}>Reset</button>
                <button class="form-card__button blue" on:click={next}>Next</button>
            {/if}
        </div>
    </div>
{/if}

<style>
    form{
        display: flex;
        flex-direction: column;
    }

    label {
        text-align: left;
    }

    p {
        white-space: normal;
        margin: 0;
    }

    .form-card__button {
        border: solid 2px #ff3e00;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.2);
        font-size: 1.2rem;
        margin: 20px;
        padding: 5px;
        width: 200px;
        max-width: 30vw;
    }


    .card {
        padding: 10%;
        border-radius: 5px;
        height: 60vh;
        width: 600px;
        max-width: 80vw;
        color: white;
        font-size: 4rem;
        text-align: center;
        background-color: #FFA385;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        overflow: auto;
    }

    .capsule {
        height: 15vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: stretch;
    }

    .forgotten {
        font-size: 2rem;
    }

    @media (max-width: 600px) {
        .card{
            font-size: 2rem;
        }

        .forgotten {
            font-size: 1rem;
        }

        .form-card__button{
            max-width: 30vw;
            font-size: 1rem;
            margin: 5px;
            padding: 2px;
        }
    }
</style>