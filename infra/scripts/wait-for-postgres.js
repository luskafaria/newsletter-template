const {exec} = require("node:child_process")

function checkPostgres() {
  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1){
      process.stdout.write(".")

      checkPostgres()
      return;
    }

    console.log("\nPostgres is ready and accepting connections\n")
  }

  exec('docker exec postgres_dev pg_isready --host localhost', handleReturn)
}

process.stdout.write("\n\nWaiting for postgres accept connections")
checkPostgres()