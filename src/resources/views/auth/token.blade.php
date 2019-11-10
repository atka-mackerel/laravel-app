<script>
    const Laravel = @json([
        'apiToken' => \Auth::user()->api_token ?? null
    ]);
</script>
