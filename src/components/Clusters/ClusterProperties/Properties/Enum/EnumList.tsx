import React, { useEffect, useState } from 'react'
import { propertiesAPI } from "../../../../../API/API";
import { Button, Col, Input, message, Row, Space, Switch, Typography } from "antd";
import { Loader } from "../../../../common/Loader";
import { EnumItem } from "./EnumItem";
import { CheckOutlined } from "@ant-design/icons";
import { Enum, NewPropertyDataForAllUpdate } from "../../../types";
import { Id } from "../../../../../API/types";

const ENUM_LIST: Enum[] = JSON.parse(JSON.stringify({
    "name": "Уровень",
    "type": "ENUM",
    "_embedded": {
        "cluster": {
            "name": "Данные сотрудника",
            "id": 1,
            "definition": "Данные сотрудника",
            "_links": {
                "properties": {
                    "href": "https://brooms.herokuapp.com/cluster/1/properties{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/cluster/1{?projection}",
                    "templated": true
                }
            }
        },
        "definitions": [{
            "name": "Senior",
            point: '3',
            "id": 1,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/1/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/1/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/1{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Junior",
            point: '1.6',
            "id": 2,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/2/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/2/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/2{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Trainee",
            point: '15',
            "id": 3,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/3/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/3/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/3{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "TechLead",
            point: '0',
            "id": 4,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/4/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/4/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/4{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Middle",
            point: '1',
            "id": 5,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/5/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/5/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/5{?projection}",
                    "templated": true
                }
            }
        }, {
            "name": "Middle+",
            point: '11.111212',
            "id": 6,
            "_links": {
                "property": {
                    "href": "https://brooms.herokuapp.com/definition/6/property{?projection}",
                    "templated": true
                },
                "values": {
                    "href": "https://brooms.herokuapp.com/definition/6/values{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/definition/6{?projection}",
                    "templated": true
                }
            }
        }],
        "values": [{
            "numberValue": null,
            "user": {
                "email": "зло@страх.тюрьма",
                "telephone": "+7 (596) 231-25-29",
                "avatarUrl": null,
                "fioUser": "Алчеев Андрей Анатольевич",
                "userPosition": {
                    "name": "Главный инженер",
                    "id": 3,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userPosition/3/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userPosition/3{?projection}",
                            "templated": true
                        }
                    }
                },
                "userDepartment": {
                    "name": "ОД",
                    "id": 3,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3{?projection}",
                            "templated": true
                        }
                    }
                },
                "userRole": {
                    "name": "Сервисный инженер",
                    "id": 10,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userRole/10/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userRole/10{?projection}",
                            "templated": true
                        }
                    }
                },
                "userProject": {
                    "name": "DITA",
                    "id": 1,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userProject/1/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userProject/1{?projection}",
                            "templated": true
                        }
                    }
                },
                "id": 1,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/user/1/values{?projection}",
                        "templated": true
                    },
                    "userPosition": {
                        "href": "https://brooms.herokuapp.com/user/1/userPosition{?projection}",
                        "templated": true
                    },
                    "userRole": {
                        "href": "https://brooms.herokuapp.com/user/1/userRole{?projection}",
                        "templated": true
                    },
                    "userProject": {
                        "href": "https://brooms.herokuapp.com/user/1/userProject{?projection}",
                        "templated": true
                    },
                    "userDepartment": {
                        "href": "https://brooms.herokuapp.com/user/1/userDepartment{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/user/1{?projection}",
                        "templated": true
                    }
                }
            },
            "dateTimeValue": null,
            "dateTimeChange": "2022-11-27T04:59:35.813",
            "stringValue": null,
            "enumValue": {
                "name": "Trainee",
                "id": 3,
                "_links": {
                    "property": {
                        "href": "https://brooms.herokuapp.com/definition/3/property{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/definition/3/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/definition/3{?projection}",
                        "templated": true
                    }
                }
            },
            "sourceOfChange": {
                "name": "Повышение уровня",
                "id": 4,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/4/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/4{?projection}",
                        "templated": true
                    }
                }
            },
            "property": {
                "name": "Уровень",
                "id": 2,
                "type": "ENUM",
                "_links": {
                    "cluster": {
                        "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
                        "templated": true
                    },
                    "definitions": {
                        "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/property/2{?projection}",
                        "templated": true
                    }
                }
            },
            "id": 5,
            "_links": {
                "user": {
                    "href": "https://brooms.herokuapp.com/value/5/user{?projection}",
                    "templated": true
                },
                "property": {
                    "href": "https://brooms.herokuapp.com/value/5/property{?projection}",
                    "templated": true
                },
                "enumValue": {
                    "href": "https://brooms.herokuapp.com/value/5/enumValue{?projection}",
                    "templated": true
                },
                "sourceOfChange": {
                    "href": "https://brooms.herokuapp.com/value/5/sourceOfChange{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/value/5{?projection}",
                    "templated": true
                }
            }
        }, {
            "numberValue": null,
            "user": {
                "email": "судья@перевод.система",
                "telephone": "+7 (391) 696-96-60",
                "avatarUrl": null,
                "fioUser": "Анкушин Николай Владимирович",
                "userPosition": {
                    "name": "Ведущий инженер",
                    "id": 2,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userPosition/2/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userPosition/2{?projection}",
                            "templated": true
                        }
                    }
                },
                "userDepartment": {
                    "name": "ОД",
                    "id": 3,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3{?projection}",
                            "templated": true
                        }
                    }
                },
                "userRole": {
                    "name": "Координатор",
                    "id": 6,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userRole/6/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userRole/6{?projection}",
                            "templated": true
                        }
                    }
                },
                "userProject": {
                    "name": "СИМР",
                    "id": 11,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userProject/11/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userProject/11{?projection}",
                            "templated": true
                        }
                    }
                },
                "id": 2,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/user/2/values{?projection}",
                        "templated": true
                    },
                    "userPosition": {
                        "href": "https://brooms.herokuapp.com/user/2/userPosition{?projection}",
                        "templated": true
                    },
                    "userRole": {
                        "href": "https://brooms.herokuapp.com/user/2/userRole{?projection}",
                        "templated": true
                    },
                    "userProject": {
                        "href": "https://brooms.herokuapp.com/user/2/userProject{?projection}",
                        "templated": true
                    },
                    "userDepartment": {
                        "href": "https://brooms.herokuapp.com/user/2/userDepartment{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/user/2{?projection}",
                        "templated": true
                    }
                }
            },
            "dateTimeValue": null,
            "dateTimeChange": "2022-11-27T04:59:43.917",
            "stringValue": null,
            "enumValue": {
                "name": "Middle",
                "id": 5,
                "_links": {
                    "property": {
                        "href": "https://brooms.herokuapp.com/definition/5/property{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/definition/5/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/definition/5{?projection}",
                        "templated": true
                    }
                }
            },
            "sourceOfChange": {
                "name": "Понижение уровня",
                "id": 5,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/5/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/5{?projection}",
                        "templated": true
                    }
                }
            },
            "property": {
                "name": "Уровень",
                "id": 2,
                "type": "ENUM",
                "_links": {
                    "cluster": {
                        "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
                        "templated": true
                    },
                    "definitions": {
                        "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/property/2{?projection}",
                        "templated": true
                    }
                }
            },
            "id": 6,
            "_links": {
                "user": {
                    "href": "https://brooms.herokuapp.com/value/6/user{?projection}",
                    "templated": true
                },
                "property": {
                    "href": "https://brooms.herokuapp.com/value/6/property{?projection}",
                    "templated": true
                },
                "enumValue": {
                    "href": "https://brooms.herokuapp.com/value/6/enumValue{?projection}",
                    "templated": true
                },
                "sourceOfChange": {
                    "href": "https://brooms.herokuapp.com/value/6/sourceOfChange{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/value/6{?projection}",
                    "templated": true
                }
            }
        }, {
            "numberValue": null,
            "user": {
                "email": "трава@страх.подарок",
                "telephone": "+7 (733) 693-28-58",
                "avatarUrl": null,
                "fioUser": "Аносов Алексей Юрьевич",
                "userPosition": {
                    "name": "Ведущий инженер",
                    "id": 2,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userPosition/2/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userPosition/2{?projection}",
                            "templated": true
                        }
                    }
                },
                "userDepartment": {
                    "name": "ОД",
                    "id": 3,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userDepartment/3{?projection}",
                            "templated": true
                        }
                    }
                },
                "userRole": {
                    "name": "Тех.писатель",
                    "id": 12,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userRole/12/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userRole/12{?projection}",
                            "templated": true
                        }
                    }
                },
                "userProject": {
                    "name": "СИО",
                    "id": 28,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userProject/28/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userProject/28{?projection}",
                            "templated": true
                        }
                    }
                },
                "id": 3,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/user/3/values{?projection}",
                        "templated": true
                    },
                    "userPosition": {
                        "href": "https://brooms.herokuapp.com/user/3/userPosition{?projection}",
                        "templated": true
                    },
                    "userRole": {
                        "href": "https://brooms.herokuapp.com/user/3/userRole{?projection}",
                        "templated": true
                    },
                    "userProject": {
                        "href": "https://brooms.herokuapp.com/user/3/userProject{?projection}",
                        "templated": true
                    },
                    "userDepartment": {
                        "href": "https://brooms.herokuapp.com/user/3/userDepartment{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/user/3{?projection}",
                        "templated": true
                    }
                }
            },
            "dateTimeValue": null,
            "dateTimeChange": "2022-11-27T04:59:48.261",
            "stringValue": null,
            "enumValue": {
                "name": "Senior",
                "id": 1,
                "_links": {
                    "property": {
                        "href": "https://brooms.herokuapp.com/definition/1/property{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/definition/1/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/definition/1{?projection}",
                        "templated": true
                    }
                }
            },
            "sourceOfChange": {
                "name": "Покупка лута",
                "id": 3,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/3/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/3{?projection}",
                        "templated": true
                    }
                }
            },
            "property": {
                "name": "Уровень",
                "id": 2,
                "type": "ENUM",
                "_links": {
                    "cluster": {
                        "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
                        "templated": true
                    },
                    "definitions": {
                        "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/property/2{?projection}",
                        "templated": true
                    }
                }
            },
            "id": 7,
            "_links": {
                "user": {
                    "href": "https://brooms.herokuapp.com/value/7/user{?projection}",
                    "templated": true
                },
                "property": {
                    "href": "https://brooms.herokuapp.com/value/7/property{?projection}",
                    "templated": true
                },
                "enumValue": {
                    "href": "https://brooms.herokuapp.com/value/7/enumValue{?projection}",
                    "templated": true
                },
                "sourceOfChange": {
                    "href": "https://brooms.herokuapp.com/value/7/sourceOfChange{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/value/7{?projection}",
                    "templated": true
                }
            }
        }, {
            "numberValue": null,
            "user": {
                "email": "настроение@перевод.компьютер",
                "telephone": "+7 (102) 710-27-86",
                "avatarUrl": null,
                "fioUser": "Антипин Юрий Сергеевич",
                "userPosition": {
                    "name": "Инженер 1 категории",
                    "id": 1,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userPosition/1/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userPosition/1{?projection}",
                            "templated": true
                        }
                    }
                },
                "userDepartment": {
                    "name": "ОА",
                    "id": 2,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userDepartment/2/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userDepartment/2{?projection}",
                            "templated": true
                        }
                    }
                },
                "userRole": {
                    "name": "Аналитик",
                    "id": 5,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userRole/5/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userRole/5{?projection}",
                            "templated": true
                        }
                    }
                },
                "userProject": {
                    "name": "АС ППА технические писатели",
                    "id": 25,
                    "_links": {
                        "users": {
                            "href": "https://brooms.herokuapp.com/userProject/25/users{?projection}",
                            "templated": true
                        },
                        "self": {
                            "href": "https://brooms.herokuapp.com/userProject/25{?projection}",
                            "templated": true
                        }
                    }
                },
                "id": 4,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/user/4/values{?projection}",
                        "templated": true
                    },
                    "userPosition": {
                        "href": "https://brooms.herokuapp.com/user/4/userPosition{?projection}",
                        "templated": true
                    },
                    "userRole": {
                        "href": "https://brooms.herokuapp.com/user/4/userRole{?projection}",
                        "templated": true
                    },
                    "userProject": {
                        "href": "https://brooms.herokuapp.com/user/4/userProject{?projection}",
                        "templated": true
                    },
                    "userDepartment": {
                        "href": "https://brooms.herokuapp.com/user/4/userDepartment{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/user/4{?projection}",
                        "templated": true
                    }
                }
            },
            "dateTimeValue": null,
            "dateTimeChange": "2022-11-27T04:59:52.556",
            "stringValue": null,
            "enumValue": {
                "name": "Middle",
                "id": 5,
                "_links": {
                    "property": {
                        "href": "https://brooms.herokuapp.com/definition/5/property{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/definition/5/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/definition/5{?projection}",
                        "templated": true
                    }
                }
            },
            "sourceOfChange": {
                "name": "Понижение уровня",
                "id": 5,
                "_links": {
                    "values": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/5/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/sourceOfChange/5{?projection}",
                        "templated": true
                    }
                }
            },
            "property": {
                "name": "Уровень",
                "id": 2,
                "type": "ENUM",
                "_links": {
                    "cluster": {
                        "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
                        "templated": true
                    },
                    "definitions": {
                        "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
                        "templated": true
                    },
                    "values": {
                        "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
                        "templated": true
                    },
                    "self": {
                        "href": "https://brooms.herokuapp.com/property/2{?projection}",
                        "templated": true
                    }
                }
            },
            "id": 8,
            "_links": {
                "user": {
                    "href": "https://brooms.herokuapp.com/value/8/user{?projection}",
                    "templated": true
                },
                "property": {
                    "href": "https://brooms.herokuapp.com/value/8/property{?projection}",
                    "templated": true
                },
                "enumValue": {
                    "href": "https://brooms.herokuapp.com/value/8/enumValue{?projection}",
                    "templated": true
                },
                "sourceOfChange": {
                    "href": "https://brooms.herokuapp.com/value/8/sourceOfChange{?projection}",
                    "templated": true
                },
                "self": {
                    "href": "https://brooms.herokuapp.com/value/8{?projection}",
                    "templated": true
                }
            }
        }]
    },
    "_links": {
        "self": {
            "href": "https://brooms.herokuapp.com/property/2"
        },
        "property": {
            "href": "https://brooms.herokuapp.com/property/2{?projection}",
            "templated": true
        },
        "cluster": {
            "href": "https://brooms.herokuapp.com/property/2/cluster{?projection}",
            "templated": true
        },
        "definitions": {
            "href": "https://brooms.herokuapp.com/property/2/definitions{?projection}",
            "templated": true
        },
        "values": {
            "href": "https://brooms.herokuapp.com/property/2/values{?projection}",
            "templated": true
        }
    }
}))._embedded.definitions


type EnumListProps = {
    propertyId: Id;
};

export const EnumList: React.FC<EnumListProps> = ({ propertyId }) => {
    const [loading, setLoading] = useState(false)
    const [enumList, setEnumList] = useState<Enum[]>(ENUM_LIST)
    const [deletingItemsIds, setDeletingItemsIds] = useState<Id[]>([])
    const [isEdit, setIsEdit] = useState(false)
    const [creating, setCreating] = useState(false)
    const [newEnumItem, setNewEnumItem] = useState('')
    const [withWeights, setWithWeights] = useState(true)
    const [changingAll, setChangingAll] = useState(false)

    const createEnumItem = async () => {
        setCreating(true)
        propertiesAPI.createEnumItem(newEnumItem, propertyId)
            .then(({ data: { id } }) => {
                setEnumList(list => [...list, { name: newEnumItem, id, point: 1 }]);
            })
            .catch(() => message.error('Не удалось добавить элемент в список :('))
            .finally(() => {
                setCreating(false);
                setIsEdit(false);
                setNewEnumItem('');
            })
    }

    const deleteEnumItem = async (id: Id) => {
        setDeletingItemsIds(ids => [...ids, id])
        propertiesAPI.deleteEnumItem(id)
            .then(() => {
                setDeletingItemsIds(ids => ids.filter(itemId => itemId !== id))
                setEnumList(items => items.filter(item => item.id !== id))
            })
            .catch(() => message.error('Не удалось удалить элемент из списка :('))
    }

    const changeEnumItem = async (id: Id, name: string, point: number) => {
        await propertiesAPI.changeEnumItem(id, name, point)
            .then(() => {
                setEnumList(items => items.map(item => {
                    if (item.id === id) {
                        return { ...item, name, point }
                    }
                    return item
                }))
            })
            .catch(() => message.error('Не удалось изменить элемент списка :('))
    }

    const onWeightChange = () => {
        if (withWeights) {
            const newData: NewPropertyDataForAllUpdate[] = enumList.map(item => ({
                id: item.id,
                propertyDefinitionModel: {
                    name: item.name,
                    point: 1
                }
            }))

            setChangingAll(true)
            propertiesAPI.changeAllEnums(newData)
                .then(() => {
                    setWithWeights(false)
                    setEnumList(newData.map(item => ({
                        id: item.id,
                        name: item.propertyDefinitionModel.name,
                        point: item.propertyDefinitionModel.point,
                    })))
                })
                .catch(() => message.error('Не удалось изменить веса :('))
                .finally(() => setChangingAll(false))
        } else {
            setWithWeights(true)
        }
    }

    useEffect(() => {
        setLoading(true)
        propertiesAPI.getEnumList(propertyId)
            .then(data => {
                setWithWeights(!data.every(item => item.point === 1))
                setEnumList(data)
            })
            .catch(() => message.error('Не удалось получить список :('))
            .finally(() => setLoading(false))
    }, [propertyId])

    return (
        <Space direction="vertical" size='middle' style={{ width: 'calc((100vw - 300px) / 3)', padding: '8px 0 0 0' }}>
            {loading
                ? <div style={{ display: 'flex', justifyContent: 'center' }}><Loader /></div>
                : <>
                    {isEdit
                        ? <Input.Group compact style={{ padding: '0 12px', display: 'flex', justifyContent: 'center' }}>
                            <Input
                                value={newEnumItem}
                                onChange={e => setNewEnumItem(e.target.value)}
                            />
                            <Button
                                type="primary"
                                onClick={createEnumItem}
                                loading={creating}
                                icon={<CheckOutlined />}
                            />
                        </Input.Group>
                        : <Row gutter={24} justify='space-between' align='middle' style={{ padding: '0 12px' }}>
                            <Col>
                                <Button type='primary' onClick={() => setIsEdit(true)}>+ Добавить</Button>
                            </Col>
                            <Col>
                                <Space size={8}>
                                    <Typography.Text>Задать веса</Typography.Text>
                                    <Switch title='Задать веса' checked={withWeights} onChange={onWeightChange}
                                        loading={changingAll} />
                                </Space>
                            </Col>
                        </Row>
                    }
                    <Space style={{ width: '100%', padding: '0 12px 16px 12px' }} direction='vertical' size='middle'>
                        {enumList.map(e => (
                            <EnumItem
                                {...e}
                                key={e.id}
                                deleteItem={() => deleteEnumItem(e.id)}
                                deleting={deletingItemsIds.includes(e.id)}
                                changeItem={changeEnumItem}
                                withWeights={withWeights}
                            />
                        ))}
                    </Space>
                </>
            }
        </Space>
    )
}