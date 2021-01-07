<script>
    export let content
    export let titles

    import { onMount } from 'svelte';

    onMount(() => {
        window.scrollTo(0,document.body.scrollHeight);
    });
</script>
<div class="overlflowX">
    <table>
        {#if content && titles}
            <tr>
                {#each titles as title}
                    <th>{title}</th>
                {/each}
            </tr>
            {#each content as line}
                <tr>
                    {#each line as item}
                        <td>{item}</td>
                    {/each}
                </tr>
            {/each}
        {:else}
            <p>No content loaded.</p>
        {/if}
    </table>
</div>


<style>
    .overlflowX {
        overflow-x: auto;
        max-width: 80vw;
    }

    table {
        min-width: 600px;
    }

    th, td {
        padding: 15px;
        text-align: left;
    }

    th {
        background-color: #FFA385;
        color: white;
        font-weight: bold;
    }

    table tr:nth-child(odd){
        background-color: #FFA385;
    }

    table tr:nth-child(even){
        background-color: #FFE0D6;
    }
</style>
