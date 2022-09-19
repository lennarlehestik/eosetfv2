const fs = require(`fs`);
const path = require(`path`);
const { Serialize } = require(`eosjs`);
const { api } = require(`./config.js`);

deployContract({
  account: "ironscimitar",
  contractDir: `/Users/vlad/Desktop/eosetfcpp`,
});

function getDeployableFilesFromDir(dir) {
  const dirCont = fs.readdirSync(dir);
  const wasmFileName = dirCont.find((filePath) =>
    filePath.match(/.*\.(wasm)$/gi)
  );
  const abiFileName = dirCont.find((filePath) =>
    filePath.match(/.*\.(abi)$/gi)
  );
  if (!wasmFileName) throw new Error(`Cannot find a ".wasm file" in ${dir}`);
  if (!abiFileName) throw new Error(`Cannot find an ".abi file" in ${dir}`);
  return {
    wasmPath: path.join(dir, wasmFileName),
    abiPath: path.join(dir, abiFileName),
  };
}

async function deployContract({ account, contractDir }) {
  const { wasmPath, abiPath } = getDeployableFilesFromDir(contractDir);

  // 1. Prepare SETCODE
  // read the file and make a hex string out of it
  const wasm = fs.readFileSync(wasmPath).toString(`hex`);

  // 2. Prepare SETABI
  const buffer = new Serialize.SerialBuffer({
    textEncoder: api.textEncoder,
    textDecoder: api.textDecoder,
  });

  let abi = JSON.parse(fs.readFileSync(abiPath, `utf8`));
  const abiDefinition = api.abiTypes.get(`abi_def`);
  // need to make sure abi has every field in abiDefinition.fields
  // otherwise serialize throws
  abi = abiDefinition.fields.reduce(
    (acc, { name: fieldName }) =>
      Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
    abi
  );
  abiDefinition.serialize(buffer, abi);

  let actions = [
    {
      account: "eosio",
      name: "setcode",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        account: "cet.f",
        vmtype: 0,
        vmversion: 0,
        code: wasm,
      },
    },
    {
      account: "eosio",
      name: "setabi",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        account: "cet.f",
        abi: Buffer.from(buffer.asUint8Array()).toString(`hex`),
      },
    },
    {
      account: "cet.f",
      name: "setdivper",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        claimperiod: 0,
      },
    },
    {
      account: "cet.f",
      name: "setdivperfrq",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        claimfreq: 604800,
      },
    },
    {
      account: "cet.f",
      name: "seteosetfadj",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        quantity: "0.0000 EOSETF",
      },
    },
    {
      account: "cet.f",
      name: "seteosworth",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        eosworth: 0,
      },
    },
    {
      account: "cet.f",
      name: "setrefundrate",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        rate: 0.95,
      },
    },
    {
      account: "cet.f",
      name: "settotfeeamt",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        quantity: "0.0000 EOSETF",
      },
    },
    {
      account: "cet.f",
      name: "settotstkd",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        totstketfbx: "0 BOXAUJ",
        totstkcetf: "0.0000 CETF",
      },
    },
    {
      account: "cet.f",
      name: "addportfel",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        community: "cetfcetfcetf",
        creator: "cet.f",
        pollkey: 69,
      },
    },
    {
      account: "cet.f",
      name: "addtokuz",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        tokeninfund: { siialisadap2rastpauso },
        tokenwortheos: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        tokenperold: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        tokenpercnew: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        decimals: [
          1000,
          1000000,
          10000,
          10000,
          10000,
          10000,
          10000,
          10000,
          10000,
          10000,
          100000000,
          1000000,
          10000,
          100000000,
          10000,
          10000,
          10000,
          10000,
          100000000,
          10000,
        ],
        pairid: [
          93,
          588,
          11,
          112,
          1715,
          22,
          255,
          4,
          1551,
          191,
          878,
          194,
          8,
          1734,
          193,
          1760,
          12,
          1720,
          28,
          14,
        ],
        strpairid: [
          "93",
          "588",
          "11",
          "112",
          "1715",
          "22",
          "255",
          "4",
          "1551",
          "191",
          "878",
          "194",
          "8",
          "1734",
          "193",
          "1760",
          "12",
          "1720",
          "28",
          "14",
        ],
        token: [
          "3,IQ",
          "6,DAD",
          "4,VIG",
          "4,PGL",
          "4,DOP",
          "4,DFS",
          "4,EMT",
          "4,TPT",
          "4,DEX",
          "4,EFX",
          "8,OGX",
          "6,BOX",
          "4,BOID",
          "8,MLNK",
          "4,DAPP",
          "4,ZEOS",
          "4,USDT",
          "4,XSOV",
          "8,CHEX",
          "4,PIZZA",
        ],
        contract: [
          "everipediaiq",
          "dadtoken1111",
          "vig111111111",
          "prospectorsg",
          "dop.efi",
          "minedfstoken",
          "emanateoneos",
          "eosiotptoken",
          "token.newdex",
          "effecttokens",
          "core.ogx",
          "token.defi",
          "boidcomtoken",
          "swap.pcash",
          "dappservices",
          "thezeostoken",
          "tethertether",
          "xsovxsovxsov",
          "chexchexchex",
          "pizzatotoken",
        ],
        ratio: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        minamount: [
          "0.000 IQ",
          "0.000000 DAD",
          "0.0000 VIG",
          "0.0000 PGL",
          "0.0000 DOP",
          "0.0000 DFS",
          "0.0000 EMT",
          "0.0000 TPT",
          "0.0000 DEX",
          "0.0000 EFX",
          "0.00000000 OGX",
          "0.000000 BOX",
          "0.0000 BOID",
          "0.00000000 MLNK",
          "0.0000 DAPP",
          "0.0000 ZEOS",
          "0.0000 USDT",
          "0.0000 XSOV",
          "0.00000000 CHEX",
          "0.0000 PIZZA",
        ],
        totalvote: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        community: "fundfundfund",
        pollkey: 420,
      },
    },
    {
      account: "dappservices",
      name: "unstake",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        provider: "thedappfund1",
        quantity: "12161.6000 DAPP",
        service: "stakeservice",
        to: "cet.f",
      },
    },
    {
      account: "cet.f",
      name: "pause",
      authorization: [
        {
          actor: "cet.f",
          permission: "active",
        },
      ],
      data: {
        ispaused: 1,
      },
    },
  ];

  let seActions = await api.serializeActions(actions);
  //console.log(seActions[0].data)
  //console.log(seActions[1].data)

  // BUILD THE MULTISIG PROPOSE TRANSACTION
  actionData = {
    proposer: account,
    proposal_name: "phasetwo",

    requested: [
      {
        actor: "dogmanlabs11",
        permission: "active",
      },
      {
        actor: "ha3dcnbxgyge",
        permission: "active",
      },
      {
        actor: "lennyaccount",
        permission: "owner",
      },
      {
        actor: "rvrkingfishr",
        permission: "active",
      },
      {
        actor: "vladislav.x",
        permission: "owner",
      },
    ],
    trx: {
      expiration: "2022-09-10T16:39:15",
      ref_block_num: 0,
      ref_block_prefix: 0,
      max_net_usage_words: 0,
      max_cpu_usage_ms: 0,
      delay_sec: 0,
      context_free_actions: [],
      actions: [
        {
          account: "eosio",
          name: "setcode",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[0].data,
        },
        {
          account: "eosio",
          name: "setabi",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[1].data,
        },
        {
          account: "cet.f",
          name: "setdivper",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[2].data,
        },
        {
          account: "cet.f",
          name: "setdivperfrq",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[3].data,
        },
        {
          account: "cet.f",
          name: "seteosetfadj",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[4].data,
        },
        {
          account: "cet.f",
          name: "seteosworth",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[5].data,
        },
        {
          account: "cet.f",
          name: "setrefundrate",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[6].data,
        },
        {
          account: "cet.f",
          name: "settotfeeamt",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[7].data,
        },
        {
          account: "cet.f",
          name: "settotstkd",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[8].data,
        },
        {
          account: "cet.f",
          name: "addportfel",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[8].data,
        },
        {
          account: "cet.f",
          name: "addtokuz",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[9].data,
        },
        {
          account: "dappservices",
          name: "unstake",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[10].data,
        },
        {
          account: "cet.f",
          name: "pause",
          authorization: [
            {
              actor: "cet.f",
              permission: "active",
            },
          ],
          data: seActions[11].data,
        },
      ],
      transaction_extensions: [],
    },
  };

  try {
    const result = await api.transact(
      {
        actions: [
          {
            account: "eosio.msig",
            name: "propose",
            authorization: [
              {
                actor: account,
                permission: "owner",
              },
            ],
            data: actionData,
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
        broadcast: true,
        sign: true,
      }
    );
    console.log(result);
  } catch (e) {
    console.log("Caught exception: " + e);
    if (e instanceof RpcError) {
      console.log(JSON.stringify(e.json, null, 2));
    }
  }
}

/*

cleos -u https://eos.greymass.com  multisig approve ironscimitar kakspluskaks '{"actor": "vladislav.x", "permission": "active"}' -p vladislav.x@active







// 3. Send transaction with both setcode and setabi actions
const result = await api.transact(
  {
    actions: [
      {
        account: 'eosio',
        name: 'setcode',
        authorization: [
          {
            actor: account,
            permission: 'active',
          },
        ],
        data: {
          account: account,
          vmtype: 0,
          vmversion: 0,
          code: wasm,
        },
      },
      {
        account: 'eosio',
        name: 'setabi',
        authorization: [
          {
            actor: account,
            permission: 'active',
          },
        ],
        data: {
          account: account,
          abi: Buffer.from(buffer.asUint8Array()).toString(`hex`),
        },
      },
    ],
  },
  {
    blocksBehind: 3,
    expireSeconds: 30,
  }
)
}



[1000,1000000,10000,10000,10000,10000,10000,10000,10000,10000,100000000,1000000,10000,100000000,10000,10000,10000,10000,100000000,10000]

*/

// CREATE ACTION TO PROPOSE

// SEND THE MULTISIG PROPOSE
