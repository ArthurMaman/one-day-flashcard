<script>
    import { onMount } from 'svelte';

    export let data = [];
    export let titles;
    let flashing = false;
    let current = Math.floor(Math.random() * data.length);
    let last = current;
    let forgotten = false;
    let chosen = [];

    const next = () => {
        forgotten = false;
        let newIndex = Math.floor(Math.random() * data.length);
        if(data.length > 3){
            while (newIndex === current || newIndex === last){
                newIndex = Math.floor(Math.random() * data.length);
            }
        }
        last = current;
        current = newIndex;
    }

    const reset = () => {
        forgotten = false;
        flashing = false;
    }


    onMount(() => {
        window.scrollTo(0,document.body.scrollHeight);
    });
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
                <p>{data[current][choice]}</p>
            {/each}
        {:else}
            {#each titles as choice}
                <p class="forgotten">{data[current][choice]}</p>
            {/each}
        {/if}
    </div>
    <div class="capsule">
        <div>
            {#if !forgotten}
                <button class="form-card__button blue" on:click={reset}>Reset</button>
                <button class="form-card__button blue" on:click={()=>forgotten = true}>Check</button>
                <button class="form-card__button green"  on:click={next}>Got it !</button>
            {:else}
                <button class="form-card__button blue" on:click={reset}>Reset</button>
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